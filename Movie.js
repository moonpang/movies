import React, { Component } from 'react'
import './Movie.css';
import LinesEllipsis from 'react-lines-ellipsis'
import PropTypes from 'prop-types';



class Movie extends Component {
    state = {
   
    }
    
    componentWillMount(){
        console.log("@@", this.props.genres);
        this.setState({
            genres : this.props.genres
        })
    }
    
  _renderGenres = () => {
    console.log("this.state.genres", this.state.genres)
    const genres = this.state.genres.map((genre, index) => {
      return <MovieGenres genre={genre} key={index} />
    })
    return genres
  }

    render() {
        return (
            <div className="Movie">
                <div className="Movie_Columns">
                    <MoviePoster poster={this.props.poster} alt={this.props.title}/>
                </div>
                <div className="Movie_Columns">
                    <h1> {this.props.title }</h1>
                    <div className="Movie_Genres">
                        {this._renderGenres()}
                    </div>
                    <div className="Movie_Synopsis">
                        <LinesEllipsis
                            text={this.props.synopsis}
                            maxLine='3'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

class MovieGenres extends Component {
    render() {
        return (
           <span className="Movie_Genre">{this.props.genre}</span>
        )
    }
}


class MoviePoster extends Component {
    render() {
        return (
            <img src={this.props.poster} className="Movie_Poster" alt={this.props.alt} title={this.props.alt}/>
        )
    }
}


Movie.PropTypes = {
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genres: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
}

MoviePoster.PropTypes = {
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default Movie;