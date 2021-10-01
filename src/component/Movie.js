import React, { Component } from 'react';

class Movie extends Component {
    render() {
        return (
            <div>
               <p>Title: {this.props.movieResult.title}</p>
                            <p>Overview: {this.props.movieResult.overview}</p>
                            <p>Average Votes: {this.props.movieResult.average_votes}</p>
                            <p>Total Votes: {this.props.movieResult.total_votes}</p>
                            <img src={this.props.movieResult.image_url} alt={this.props.movieResult.title}/>
                            <p>Popularity: {this.props.movieResult.popularity}</p>
                            <p>Released On: {this.props.movieResult.released_on}</p>
            </div>
        )
    }
}

export default Movie