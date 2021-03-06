import React from 'react'
import { map, addIndex, has } from 'ramda'
import Survey from './Survey'

module.exports = React.createClass({
  render: function () {
    const { surveyFields, ruleDict } = this.props

    const patchRepFromPatch = (patch) =>
    !has('delete', patch)
    ? (
      <span>set duration to <input type="text" value={patch.duration}/> and buffer to <input type="text" value={patch.buffer}/></span>
    )
    : (
      <span>remove event from sequence</span>
    )

    const ruleElementsFromRule = (rule, i) => (
      <div key={i} className='rule'>
      <div className='well'>
        <span>If...</span>
        <Survey surveyFields={surveyFields} survey={rule.surveyPattern} setSurveyField={() => null}/>
        <span>then... {patchRepFromPatch(rule.patch)}</span>
      </div>
      <button>Remove Rule</button>
      </div>
    )

    const taskElements = map(
      (task) => (
        <div key={task.name} className='well'>
          <h3>{task.name}</h3>
          {addIndex(map)(ruleElementsFromRule, task.rules)}
          <hr/>
          <button>Add Rule</button>
        </div>
      )
    )(ruleDict.tasks)

    return (
      <div className='ruleDict'>
        {taskElements}
      </div>
    )
  }
})
