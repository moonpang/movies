import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Movie from './Movie';

class App extends Component {

  //Render : componentWillMount() -> render() -> componentDidMount()
  //Update : componentWillReceiveProps -> shouldComponentUpdate() -> componentWillUpdate() -> render() 0

  componentWillMount(){
    console.log("will mount")
  }

  componentDidMount(){
    this._getMovies();
  }

  componentWillReceiveProps() {
    console.log("receive props")
  }

  static propTypes = {
    title: PropTypes.string,
    poster: PropTypes.string,
    genres: PropTypes.array,
    synopsis: PropTypes.string,
  }

  state = {
  }

  _callAPI = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=like_count')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  _getMovies = async () => {
    const movies = await this._callAPI()
    this.setState({
      movies
    })
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      return <Movie 
                title={movie.title_english} 
                poster={movie.medium_cover_image} 
                genres={movie.genres} 
                synopsis={movie.synopsis}
                key={movie.id} />
    })
    return movies
  }

  render() {
    const { movies } = this.state;
    console.log("render")
    return (
      <div className={movies ? "App" : "App--loading"}>
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    )
  }
}

export default App;
