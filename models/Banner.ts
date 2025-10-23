import { Schema, model, models } from 'mongoose'

export interface IBanner {
  _id?: string
  image: string
  alt: string
  createdAt?: Date
  updatedAt?: Date
}

const BannerSchema = new Schema<IBanner>(
  {
    image: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { timestamps: true }
)

export const Banner = models.Banner || model<IBanner>('Banner', BannerSchema)
