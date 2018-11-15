import {nytimes_key} from './ApiKeys'

export const fetchArticles = (section) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.nytimes.com/svc/news/v3/content/all/${section}.json?api-key=${nytimes_key}`)
    .then(response => response.json())
    .then(json => resolve(json.results.map((article) => {
      return {slug_name: article.slug_name, section: article.section, abstract: article.abstract, title: article.title, url: article.url, updated_date:	article.updated_date, image: article.multimedia[3].url}
    })))
  })
}
