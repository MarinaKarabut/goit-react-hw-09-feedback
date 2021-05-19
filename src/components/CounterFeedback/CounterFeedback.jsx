import React, {useState} from 'react';

import {initialState} from './initialState'
import Notification from '../Notification/Notification'
import Section from '../Section/Section'
import Statistics from '../Statistics/Statistics'
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions'

import styles from './CounterFeedback.module.css'

const CounterFeedback = () => {

    const [stats, setStats] = useState(initialState);

    const increaseCount = (statName) => {
        const prevValue = stats[statName]
         setStats({...stats, [statName]: prevValue +1})
     }
    
    const countTotalFeedback = () => {
        const arrayValue = Object.values(stats)
        const totalValue = arrayValue.reduce((acc, value)=>  acc + value)
        return totalValue
    }

    const countPositiveFeedbackPercentage = () =>{
        const {good} = stats
        const totalValue = countTotalFeedback()
        if(!totalValue) {
            return 0
        }
        const percent = (good * 100 / totalValue).toFixed()
        return percent 
    }


    const totalValue = countTotalFeedback()
    
    return (
        <div className={styles.counter}>
            {<>
                <Section title="Please leave feedback">
                    <FeedbackOptions options={Object.keys(stats)} onLeaveFeedback={increaseCount} />
                </Section>

            
                <Section title="Statistics">
                    {totalValue ? (<Statistics
                    {...stats}
                    total={totalValue} 
                    positivePercentage={countPositiveFeedbackPercentage()} 
                    />) : (<Notification message="No feedback given" />)
                    }
            </Section>
            </>}
        </div>);
}

export default CounterFeedback
