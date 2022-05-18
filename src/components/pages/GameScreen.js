import { Link } from "react-router-dom";
import '../../App.css';
import mockData from '../ResponseData'
import { useState, useEffect } from 'react';

const Game = params => {

    const [collection, setCollection] = useState([]);
    const [extractedWords, setExtractedWords] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]);
    const [extractedCorrectWords, setExtractedCorrectWords] = useState([]);
    const [checkButtonClicked, setCheckButtonClicked] = useState(false);

    useEffect(() => {
        getCollectionFromAPI();
    }, []);

    const getCollectionFromAPI = () => {
        fetch('https://mocki.io/v1/24f1e4a1-b147-4ba6-96b3-df2a61a30834')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('source: API');
            loadRandomFromCollection(responseJson);
        })
        .catch((error) => {
          console.error(error);
          console.log('source: Local');
          loadRandomFromCollection(mockData);
        });
     }

     const loadRandomFromCollection = (source) => {
        let rdm = (Math.floor(Math.random() * source.length))
        setCollection(source[rdm]);

        for (let i = 0; i < source[rdm].all_words.length; i++) {
            let word = source[rdm].all_words[i];
            setExtractedWords(prevState => ([...prevState, word]));
        }
    }

    // add - if the word is not there
    // remove - if the word is there already
    const selectWord = (word) => {
        if (selectedWords.indexOf(word) === -1) {
            setSelectedWords(prevState => ([...prevState, word]));

        }
        else {
            const index = selectedWords.indexOf(word);
            const tempState = [...selectedWords];
            tempState.splice(index, 1);
            setSelectedWords(tempState)
        }
    }

    const checkAnswers = () => {
        setCheckButtonClicked(true);
        for (let i = 0; i < collection.good_words.length; i++) {
            let correct_word = collection.good_words[i];
            setExtractedCorrectWords(prevState => ([...prevState, correct_word]));
        }
    }

    const calculateScore = () => {
        const correct = document.querySelectorAll('.correct').length;
        const wrong = document.querySelectorAll('.wrong').length;
        const missed = document.querySelectorAll('.missed').length;

        let score = correct * 2 - (wrong + missed)
        params.setScore(score)
    }

    return (
        <div>
            <h1 className="title">{collection.question}</h1>
            <div className="gameWrapper">
                <div>
                    {extractedWords.map((word, i) =>
                        <span
                            onClick={() => { selectWord(word) }}
                            key={i}
                            className={"word " +
                                // if check button has been clicked - mark selected words
                                (checkButtonClicked ?
                                    // if the word is SELECTED and is CORRECT 
                                    (selectedWords.indexOf(word) !== -1 && extractedCorrectWords.indexOf(word) !== -1 ? 'correct' : '') +
                                    // if the word is SELECTED and is INCORRECT
                                    (selectedWords.indexOf(word) !== -1 && extractedCorrectWords.indexOf(word) === -1 ? 'wrong' : '') +
                                    // if the word NOT SELECTED but is CORRECT
                                    (selectedWords.indexOf(word) === -1 && extractedCorrectWords.indexOf(word) !== -1 ? 'missed' : '')
                                    : '')}
                            style={{
                                color: selectedWords.indexOf(word) === -1 ? 'black' : 'blue'
                            }}
                        >
                            {word}
                        </span>)}
                </div>
            </div>
            {!checkButtonClicked ?
                <span onClick={() => { checkAnswers() }} className='button'>Check</span>
                :
                <Link onClick={() => { calculateScore() }} className='button' to={{ pathname: '/Score' }}>Navigate</Link>
            }
        </div>
    );
}
export default Game;