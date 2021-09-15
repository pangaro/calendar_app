import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import { dateEvents } from '../helpers/dateEvent';


export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('events/new', event, 'POST');
            const body = await resp.json();

            console.log(body)

            if ( body.ok ) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                // console.log( event );
                dispatch( eventAddNew( event ) );
            }


        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'No de ha podido completar la operación', 'error');
        }     

    }
}



const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });



export const eventStartUpdate = ( event ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`events/${ event.id }`, event, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'No de ha podido completar la operación', 'error');
        }

    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});


export const eventStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;
        try {
            const resp = await fetchConToken(`events/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'No de ha podido completar la operación', 'error');
        }

    }
}


const eventDeleted = () => ({ type: types.eventDeleted });


export const eventStartLoading = () => {
    return async(dispatch) => {
        
        try {
            
            const resp = await fetchConToken( 'events' );
            const body = await resp.json();
            const events = dateEvents( body.event );
            // console.log(events)
            dispatch( eventLoaded( events ) );

        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'No de ha podido completar la operación', 'error');
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout =() => ({ type: types.eventLogout });