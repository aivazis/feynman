// external imports
import React from 'react'
import { connect } from 'react-redux'
// local imports
import styles from './styles'
import Fermion from './Fermion'
import ElectroWeak from './ElectroWeak'
import { EventListener, Splittable } from 'components'
import { fixPositionToGrid, generateElementId } from 'utils'
import { setElementAttrs, addAnchors, addPropagators } from 'actions/elements'

const Propagator = ({
    type,
    selected,
    id,
    info,
    elements,
    dispatch,
    addAnchor,
    addPropagator,
    setElementAttrs,
    ...element
}) => {
    // a mapping of element type to component
    const Component = {
        fermion: Fermion,
        em: ElectroWeak,
    }[type]

    if (typeof Component === 'undefined') {
        return null
    }

    // use the selected styling when appropriate
    const styling = selected ? styles.selected : {}

    return (
        <Splittable
            type="propagators"
            id={id}
            split={split({
                addAnchor,
                addPropagator,
                setElementAttrs,
                info,
                elements,
            })}
        >
            <Component
                selected={selected}
                {...element}
                {...styling}
                selected={selected}
            />
        </Splittable>
    )
}

Propagator.defaultProps = {
    strokeWidth: 2,
    stroke: "black",
    selected: false
}

export const split = ({info, elements, addAnchor, addPropagator, setElementAttrs}) => ({id, x, y}) => {
    // we need two unique ids for the split and the branch
    const [splitAnchorId, branchAnchorId] = generateElementId(elements.anchors, 2)

    // get the anchors assocaited with the propagator we need to snap
    const {anchor1, anchor2} = elements.propagators[id]

    // create both anchors on the mouses current location
    addAnchor(
        {
            id: splitAnchorId,
            x,
            y,
        },
        {
            id: branchAnchorId,
            x,
            y,
        }
    )

    // the old line will go between the split and anchor1
    setElementAttrs({
        id,
        type: 'propagators',
        anchor1,
        anchor2: splitAnchorId,
    })

    // similarly, we need two ids of propagators
    const [newPropagatorId, branchPropagatorId] = generateElementId(elements.propagators, 2)

    // create a new propagator between the split and anchor2, and the split and the branching one
    addPropagator(
        {
            id: newPropagatorId,
            type: 'fermion',
            anchor1: splitAnchorId,
            anchor2,
        },
        {
            id: branchPropagatorId,
            type: 'fermion',
            anchor1: splitAnchorId,
            anchor2: branchAnchorId,
        }
    )

    return {
        type: 'anchors',
        id: branchAnchorId
    }
}

const selector = ({elements, info}) => ({elements, info})
const mapDispatchToProps = dispatch => ({
    addAnchor: (...anchors) => dispatch(addAnchors(...anchors)),
    addPropagator: (...propagators) => dispatch(addPropagators(...propagators)),
    setElementAttrs: (...attrs) => dispatch(setElementAttrs(...attrs))
})
export default connect(selector, mapDispatchToProps)(Propagator)
