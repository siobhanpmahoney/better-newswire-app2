import React, { Component } from 'react';
import './App.css';
import 'isomorphic-fetch';
import ls from 'local-storage'
import { Switch, Route, Redirect } from 'react-router'
import { urls } from './ApiKeys'
import NavBar from './components/Nav/NavBar'
import ArticleContainer from './components/ArticleContainer'
import SidebarContainer from './components/SidebarContainer'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      wireType: "latest",
      articleIDs: {},
      viewed: [],
      bookmarks: [],
      interests: {}
    }
  }

  componentDidMount() {
    this.setState({
      wireType: "latest",
      articleIDs: ls.get('articleIDs') || {},
      viewed: ls.get('viewed') || [],
      bookmarks: ls.get('bookmarks') || [],
      interests: ls.get('interests') || {}
    })
  }

  onToggleBookmark = (article) => {
    let slug = article.slug_name
    let articleIDsState = Object.assign({}, this.state.articleIDs)
    let bookmarkedState = [...this.state.bookmarks]
    let interestsState = Object.assign({}, this.state.interests)

    if (!articleIDsState[slug] || articleIDsState[slug] != "bookmarked") {
      articleIDsState[slug] = "bookmarked"
      bookmarkedState = [article,... bookmarkedState]
      if (!interestsState[article.section]) {
        interestsState[article.section] = 1
      } else {
        interestsState[article.section] += 1
      }
    } else {
      articleIDsState.delete(slug)
      let articleIdx = bookmarkedState.indexOf(bookmarkedState.find((a) => a.slug_name == slug))
      bookmarkedState = [...bookmarkedState.slice(0, articleIdx),... bookmarkedState.slice(articleIdx+1)]
    }

    this.setState({
      articleIDs: articleIDsState,
      bookmarks: bookmarkedState,
      interests: interestsState
    })

    ls.set('articleIDs', articleIDsState);
    ls.set('bookmarks', bookmarkedState);
    ls.set('interests', interestsState);
  }

// viewArticle = (event) => {
//   event.preventDefault()
//   debugger
//
//   let slug = event.target.id
//   let articleState = Object.assign({}, this.state.articles)
//   let viewedState = Object.assign({}, this.state.viewed)
//   let bookmarkState = Object.assign({}, this.state.bookmarks)
//   let sec
//   this.state.wireType == "latest" ? sec = "latest" : sec = event.target.className
//
//   if (!!bookmarkState[slug]) {
//     articleState[sec][slug]["bookmarked"] = false
//     delete bookmarkState[slug]
//   }
//
//   if (!viewedState[slug]) {
//     articleState[sec][slug]["viewed"] = true
//     viewedState[slug] = articleState[sec][slug]
//   }
//
//   let interestState = this.addInterest(articleState[sec][slug])
//
//   this.setState({
//     articles: articleState,
//     bookmarks: bookmarkState,
//     viewed: viewedState,
//     interests: interestState
//   }, () => console.log("state after updates", this.state))
//
//   const win = window.open(articleState[sec][slug].url, '_blank');
//   win.focus()
//
// }
//
// addInterest = (art) => {
//   let articleState = Object.assign({}, this.state.articles)
//   let interestState = Object.assign({}, this.state.interests)
//   let sec
//   this.state.wireType == "latest" ? sec = "latest" : sec = art["section"]
//   if (!interestState[articleState[sec][art["section"]]]) {
//     interestState[articleState[sec][art["section"]]] = 1
//   } else {
//     interestState[articleState[sec][art.section]] += 1
//   }
//   return interestState
// }

  render() {
    let {articleIDs, viewed, bookmarks, interests} = this.state
    let sectionList = this.state.wireType == "latest" ? ["all"] : this.state.interests
    return (
      <div className="App">
        <NavBar />
        <SidebarContainer articleIDs={articleIDs} viewed={viewed} bookmarks={bookmarks}/>
        <Switch>
          <Route exact path='/latest' render={() => {
              return <ArticleContainer articleIDs={articleIDs} viewed={viewed} bookmarks={bookmarks} sections={sectionList} onToggleBookmark={this.onToggleBookmark}/>
            }} />

          <Route exact path = '/recommended' render={() => {
              return <ArticleContainer articleIDs={articleIDs} viewed={viewed} bookmarks={bookmarks} sections={sectionList} onToggleBookmark={this.onToggleBookmark}/>
            }} />

          <Redirect to='/latest' />

        </Switch>

      </div>
    );
  }
}

export default App;
