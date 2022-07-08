import { HttpResponse } from '@/application/helpers'

export interface Middleware {
  handler: (httpRequest: any) => Promise<HttpResponse>
}
