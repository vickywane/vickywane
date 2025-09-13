import blockContent from './blockContent'
import Article from './article'
import Notification from './notification'
import WorkExperience from './workExperience'
import Gallery from './gallery'
import Review from './review'
import Engagement from './engagement'
import companiesList from './companiesList'
import Company from './company'
import HomePage from './homePage'
import BlogCategory from './blogCategory'
import { Youtube } from './youtube/type'
import VacationPreview from './vacationPreview'
import Project from './projects'

export const schemaTypes = [
  HomePage,
  Article,
  BlogCategory,
  Notification,
  Engagement,
  Gallery,
  Company,
  WorkExperience,
  Review,
  companiesList,
  Youtube,
  blockContent,
  VacationPreview,
  Project
]

export default schemaTypes;