import '../../App.css';


function ScoreScreen(props) {

    return (
        <div>
            {(props.score > 0) ?
                <h1 className='title'>Congratulations, {props.name}!</h1>
                :
                <h1 className='title'>Good try, {props.name}!</h1>}
            <h1 className="title">Your score:</h1>
            <h1 className="score">{props.score}</h1>
        </div>
    )
}

export default ScoreScreen;