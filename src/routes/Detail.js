import React from 'react'
import './Detail.css';

class Detail extends React.Component {
    componentDidMount() {
        const { location, history } = this.props;
        if (location.state === undefined) {
            history.push('/')
        }
    }

    render() {
        const { location } = this.props;
        console.log(this.props);
        console.log(location.state);
        if (location.state) {
            return (
                <div className="movie__detail">
                    <div className="poster">
                        <img src={location.state.poster}></img>
                    </div>
                    <h3 className="movie__title">{location.state.title}</h3>
                    <span className="movie__year">{location.state.year}</span>
                    <span className="movie__rating">&nbsp;|&nbsp;{location.state.rating}&nbsp;|&nbsp;</span>
                    <span className="movie__genres">
                    {location.state.genres.map((genre, index) => {
                            return (
                                <span key={index} className="movie__genre">
                                    {genre}
                                </span>
                            )
                        })}
                    </span>
                    <span className="movie__runtime">{location.state.runtime}</span>
                    <p className="movie__summary">{location.state.summary}</p>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default Detail;