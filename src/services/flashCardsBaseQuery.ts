import { matchPath } from 'react-router-dom'

import { publicRoutes, router } from '@/app/router/router'
import { throttledToastError } from '@/common/consts/toastVariants'
import { RefreshTokenResponseSchema } from '@/common/zodSchemas/auth/auth.schemas'
import { failedApiResponse } from '@/services/failedApiResponse'
import { successApiResponse } from '@/services/successApiResponse'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.flashcards.andrii.es/',
  prepareHeaders: headers => {
    const token = localStorage.getItem('accessToken')

    if (headers.get('Authorization')) {
      return headers
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
      // checking whether the mutex is locked
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()

        try {
          const refreshToken = localStorage.getItem('refreshToken')
          const refreshResult = await baseQuery(
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
              method: 'POST',
              url: '/v2/auth/refresh-token',
            },
            api,
            extraOptions
          )

          if (refreshResult.data) {
            const refreshResultParsed = RefreshTokenResponseSchema.parse(refreshResult.data)

            localStorage.setItem('accessToken', refreshResultParsed.accessToken)
            localStorage.setItem('refreshToken', refreshResultParsed.refreshToken)
            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
          } else {
            /*!Исправили*/
            const isPublicRoute = publicRoutes.find(route =>
              matchPath(route.path ?? '', window.location.pathname)
            )

            if (!isPublicRoute) {
              void router.navigate('/login')
            }
          }
        } finally {
          // release must be called once the mutex should be released again.
          release()
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
      }
    }

    //обработка удачных и неудачных запросов
    successApiResponse(result)
    failedApiResponse(result)

    return result
  } catch (e) {
    throttledToastError()

    return {
      error: {
        error: String(e),
        status: 'FETCH_ERROR',
      },
    }
  }
}
