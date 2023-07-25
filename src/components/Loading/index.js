import './style.css';

function Loading(props) {
    return (
        <div className='loading'>
            <h2>{props.text}</h2>
        </div>
    )
}

export default Loading;