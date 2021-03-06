import sinon from 'sinon'
import 'babel-polyfill'
// local imports
import {
    setDiagramTitle, SET_TITLE,
    toggleGrid, TOGGLE_GRID,
    setGridSize, SET_GRID_SIZE,
    toggleHotkeys, TOGGLE_HOTKEYS,
    toggleAnchors, TOGGLE_ANCHORS,
    selectElements, SELECT_ELEMENTS,
    togglePatternModal, TOGGLE_PATTERN_MODAL,
    togglePatternModalInitialVis, TOGGLE_PATTERN_INITIAL_VIS,
    toggleExportModal, TOGGLE_EXPORT_MODAL,
    panDiagram, PAN_DIAGRAM,
    setZoom, SET_ZOOM,
    zoomIn, ZOOM_IN,
    zoomOut, ZOOM_OUT,
} from 'actions/info'
import { fieldName } from '../creators/togglePatternModalInitialVis'
import LocalStorageMock from './storage.js'
import { createStore } from 'store'


describe('Action Creators', function() {
    describe('Info', function() {
        it('change diagram title', function() {
            // the title to change the diagram to
            const title = 'hello'

            // make sure the action is expected
            expect(setDiagramTitle(title)).to.deep.equal({
                type: SET_TITLE,
                payload: title,
            })
        })

        it('pan diagram', function() {
            // the pan for the diagram
            const pan = {x: 10}

            // make sure the action is expected
            expect(panDiagram(pan)).to.deep.equal({
                type: PAN_DIAGRAM,
                payload: pan,
            })
        })

        it('toggle the grid', function() {
            // all we care about is the type
            expect(togglePatternModal()).to.deep.equal({
                type: TOGGLE_PATTERN_MODAL,
            })
        })

        it('toggle the grid', function() {
            // all we care about is the type
            expect(toggleGrid()).to.deep.equal({
                type: TOGGLE_GRID,
            })
        })

        it('toggle the export modal', function() {
            // all we care about is the type
            expect(toggleExportModal()).to.deep.equal({
                type: TOGGLE_EXPORT_MODAL,
            })
        })

        it('set the grid size', function() {
            // the new size for the grid
            const size = 20

            // all we care about is the type
            expect(setGridSize(size)).to.deep.equal({
                type: SET_GRID_SIZE,
                payload: size
            })
        })

        it('toggle the hotkeys', function() {
            // all we care about is the type
            expect(toggleHotkeys()).to.deep.equal({
                type: TOGGLE_HOTKEYS,
            })
        })

        it('toggle the anchors', function() {
            // all we care about is the type
            expect(toggleAnchors()).to.deep.equal({
                type: TOGGLE_ANCHORS,
            })
        })

        it('zoom set', function(){
            expect(setZoom(1.0)).to.deep.equal({
                type: SET_ZOOM,
                payload: 1.0,
            })
        })

        it('zoom in', function(){
            expect(zoomIn()).to.deep.equal({
                type: ZOOM_IN,
            })
        })

        it('zoom out', function(){
            expect(zoomOut()).to.deep.equal({
                type: ZOOM_OUT,
            })
        })

        describe('Toggle Pattern Initial Visibility Thunk', function() {

            // some mocks, fixtures, and spies
            let store, storage, thunk, dispatch
            beforeEach(function() {
                // a store to pass to the Thunk
                store = createStore()
                // a mocked local storage to pass to the thunk factory
                storage = new LocalStorageMock()
                // create an instance of the thunk with the mocked storage
                thunk = togglePatternModalInitialVis(storage)
                // we need a dispatch we can check against
                dispatch = sinon.spy()
            })

            it('inverts the current state in local storage', function() {
                // call the thunk
                thunk(dispatch, store.getState)

                // make sure dispatch was called with the correct action
                dispatch.should.have.been.calledWith({
                    type: TOGGLE_PATTERN_INITIAL_VIS,
                })
            })

            it('inverts the current state in local storage', function() {
                // call the thunk
                thunk(dispatch, store.getState)

                // make sure dispatch was called with the correct action
                storage.getItem(fieldName).should.deep.equal(
                    !store.getState().diagram.info.patternModalInitalVis
                )
            })
        })
    })
})
