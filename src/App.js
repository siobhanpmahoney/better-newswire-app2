import React, { Component } from 'react';
import './App.css';
import 'isomorphic-fetch';
import ls from 'local-storage'
import { Switch, Route, Redirect } from 'react-router'
import NavBar from './components/Nav/NavBar'
import ArticleContainer from './components/ArticleContainer'
import SidebarContainer from './components/SidebarContainer'

class App extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      wireType: "latest",
      articleIDs: {},
      viewed: [],
      bookmarks: [],
      interests: {}
    }
  }

  componentDidMount() {
    this.setState( {
      wireType: "latest",
      articleIDs: ls.get( 'articleIDs' ) || {},
      viewed: ls.get( 'viewed' ) || [],
      bookmarks: ls.get( 'bookmarks' ) || [],
      interests: ls.get( 'interests' ) || {}
    } )
  }

  onToggleBookmark = ( article ) => {
    let slug = article.slug_name
    let articleIDsState = Object.assign( {}, this.state.articleIDs )
    let bookmarkedState = [...this.state.bookmarks]
    let interestsState = Object.assign( {}, this.state.interests )

    if ( !articleIDsState[slug]) {
      if (articleIDsState[ slug ] != "bookmarked" ) {
        bookmarkedState = [article, ...bookmarkedState]
        articleIDsState[slug] = "bookmarked"
      }
      if ( !interestsState[ article.section ] ) {
        interestsState[ article.section ] = 1
      } else {
        interestsState[ article.section ] += 1
      }
    } else {
      if (articleIDsState[ slug ] == "bookmarked" ) {
        delete articleIDsState[slug]
        let articleIdx = bookmarkedState.indexOf( bookmarkedState.find( ( a ) => a.slug_name == slug ) )
        bookmarkedState = [...bookmarkedState.slice( 0, articleIdx ),...bookmarkedState.slice( articleIdx + 1 )]
      }


    }

    this.setState({
      articleIDs: articleIDsState,
      bookmarks: bookmarkedState,
      interests: interestsState
    })

    ls.set( 'articleIDs', articleIDsState );
    ls.set( 'bookmarks', bookmarkedState );
    ls.set( 'interests', interestsState );
  }




  onViewArticle = ( article ) => {
    let slug = article.slug_name
    let articleIDsState = Object.assign( {}, this.state.articleIDs )
    let viewedState = [...this.state.viewed]
    let interestsState = Object.assign( {}, this.state.interests )
    let bookmarkedState = [...this.state.bookmarks]

    if (articleIDsState[slug] && articleIDsState[slug] == "bookmarked") {
      let articleIdx = bookmarkedState.indexOf( bookmarkedState.find( ( a ) => a.slug_name == slug ) )
      bookmarkedState = [...bookmarkedState.slice( 0, articleIdx ),...bookmarkedState.slice( articleIdx + 1 )]
    }

    articleIDsState[slug] = "viewed"
    viewedState = [article,... viewedState]

    if (!interestsState[article.section]) {
      interestsState[article.section] = 1
    } else {
      interestsState[article.section] += 1
    }

    this.setState({
      articleIDs: articleIDsState,
      viewed: viewedState,
      bookmarks: bookmarkedState,
      interests: interestsState
    }, () => window.open(article.url, '_blank'))

    ls.set( 'articleIDs', articleIDsState );
    ls.set( 'bookmarks', bookmarkedState );
    ls.set( 'interests', interestsState );
    ls.set( 'viewed', viewedState );


  }

  render() {
    let { articleIDs, viewed, bookmarks, interests } = this.state
    let sectionList = this.state.wireType == "latest"
    ? [ "all" ]
    : this.state.interests

    return ( <div className="App">
    <NavBar/>
    <SidebarContainer articleIDs={this.state.articleIDs} viewed={viewed} bookmarks={bookmarks}/>
    <Switch>
      <Route exact="exact" path='/latest' render={() => {
          return <ArticleContainer articleIDs={this.state.articleIDs} viewed={this.state.viewed} bookmarks={this.state.bookmarks} sections={sectionList} onToggleBookmark={this.onToggleBookmark}/>
        }}/>

        <Route exact="exact" path='/recommended' render={() => {
            return <ArticleContainer articleIDs={this.state.articleIDs} viewed={this.state.viewed} bookmarks={this.state.bookmarks} sections={sectionList} onToggleBookmark={this.onToggleBookmark}/>
          }}/>

          <Redirect to='/latest'/>

        </Switch>

      </div> );
    }
  }

  export default App;
