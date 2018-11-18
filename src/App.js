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
      bookmarkIDs: {},
      viewedIDs: {},
      viewed: [],
      bookmarks: [],
      interests: {}
    }
  }

  componentDidMount() {
    this.setState( {
      wireType: "latest",
      bookmarkIDs: ls.get( 'bookmarkIDs' ) || {},
      viewedIDs: ls.get( 'viewedIDs' ) || {},
      viewed: ls.get( 'viewed' ) || [],
      bookmarks: ls.get( 'bookmarks' ) || [],
      interests: ls.get( 'interests' ) || {}
    } )
  }

  updateWireType = (type) => {
    this.setState({
      wireType: type
    })
  }

  onToggleBookmark = ( article ) => {
    debugger
    let slug = article.slug_name
    let bookmarkIDsState = Object.assign( {}, this.state.bookmarkIDs )
    let bookmarkedState = [...this.state.bookmarks]
    let interestsState = Object.assign( {}, this.state.interests )

    if (bookmarkIDsState[slug]) {
      delete bookmarkIDsState[slug]
      let articleIdx = bookmarkedState.indexOf( bookmarkedState.find( ( a ) => a.slug_name == slug ) )
      bookmarkedState = [...bookmarkedState.slice( 0, articleIdx ),...bookmarkedState.slice( articleIdx + 1 )]
    } else {
      bookmarkedState = [article, ...bookmarkedState]
      bookmarkIDsState[slug] = true
    }

    if ( !interestsState[ article.section ] ) {
      interestsState[ article.section ] = 1
    } else {
      interestsState[ article.section ] += 1
    }

    this.setState({
      bookmarkIDs: bookmarkIDsState,
      bookmarks: bookmarkedState,
      interests: interestsState
    })

    ls.set( 'bookmarkIDs', bookmarkIDsState );
    ls.set( 'bookmarks', bookmarkedState );
    ls.set( 'interests', interestsState );
  }




  onViewArticle = ( article ) => {
    let slug = article.slug_name
    let viewedIDsState = Object.assign( {}, this.state.viewedIDs )
    let interestsState = Object.assign( {}, this.state.interests )
    let viewedState = [...this.state.viewed]

    if (this.state.bookmarkIDs[slug]) {

      this.onToggleBookmark(article)
    }

    viewedState = [article,... viewedState]
    viewedIDsState[slug] = true
    if (!interestsState[article.section]) {
      interestsState[article.section] = 1
    } else {
      interestsState[article.section] += 1
    }

    this.setState({
      viewedIDs: viewedIDsState,
      viewed: viewedState,
      interests: interestsState
    }, () => window.open(article.url, '_blank'))

    ls.set( 'viewedIDs', viewedIDsState );
    ls.set( 'interests', interestsState );
    ls.set( 'viewed', viewedState );
  }

  render() {
    let { bookmarkIDs, viewed, bookmarks, interests } = this.state
    let sectionList = this.state.wireType == "latest"
    ? [ "all" ]
    : this.state.interests

    return ( <div className="App">
    <NavBar/>
    <div className="page-wrapper">

      <Switch>
        <Route exact path='/latest' render={() => {
            return <ArticleContainer bookmarkIDs={this.state.bookmarkIDs} viewedIDs={this.state.viewedIDs} viewed={this.state.viewed} bookmarks={this.state.bookmarks} sections={["all"]}
              onViewArticle={this.onViewArticle} onToggleBookmark={this.onToggleBookmark} updateWireType={this.updateWireType}/>
          }}/>

        <Route exact path='/recommended' render={() => {
              return <ArticleContainer bookmarkIDs={this.state.bookmarkIDs} viewed={this.state.viewed} viewedIDs={this.state.viewedIDs} bookmarks={this.state.bookmarks} sections={Object.keys(this.state.interests)}
                onViewArticle={this.onViewArticle} onToggleBookmark={this.onToggleBookmark} updateWireType={this.updateWireType}/>
            }}/>

            <Redirect to='/latest'/>

          </Switch>
          <SidebarContainer bookmarkIDs={this.state.bookmarkIDs} viewed={this.state.viewed} bookmarks={this.state.bookmarks} interests={this.state.interests} onViewArticle={this.onViewArticle} viewedIDs={this.state.viewedIDs} onToggleBookmark={this.onToggleBookmark} />
        </div>

      </div> );
    }
  }

  export default App;
