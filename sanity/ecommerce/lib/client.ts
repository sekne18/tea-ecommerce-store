// import { imageUrlBuilder } from "@sanity";
import {createClient} from 'next-sanity'

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-09-03'

export const dataset = assertValue(process.env.NEXT_PUBLIC_SANITY_DATASET, 'production')

export const projectId = assertValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 'f0vx3oht')

export const token = assertValue(
  process.env.NEXT_PUBLIC_SANITY_TOKEN,
  'skBdjP16b3REdvS553ppo5Sm8wCUifzxvhoz0eaT565PNA2l2oBk5ABUnMmrMRzBc1BODzmkyzFCQtr72jJ1nhnoKefRpNGeEp6VssT89C9ZtHSiBpvUVBAPZKqQZqZKENQS52mFabfNOEVD5aGbigcIJrMdEKdQ8wr8xh15eatDCLdEkBQV',
)

export const useCdn = true

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token,
  ignoreBrowserTokenWarning: true,
})
