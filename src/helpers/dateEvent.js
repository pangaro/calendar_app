import moment from 'moment';


export const dateEvents = ( events = [] ) => {
    // console.log(events)
    return events.map( ( event ) => ({
        ...event,
        start: moment( event.start ).toDate(),
        end: moment( event.end ).toDate()
    }))
}