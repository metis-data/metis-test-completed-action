import * as core from '@actions/core'
import axios from 'axios'
const {context} = require('@actions/github')

const {pull_request} = context.payload

const updateTestIsCompleted = async () => {
  try {
    axios
      .post(
        `${core.getInput('target_url')}/api/tests/update-test-to-completed`,
        {
          name: pull_request.title,
          apiKey: core.getInput('metis_api_key')
        }
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  } catch (error) {
    console.log(error)
  }
}

const run = async (): Promise<void> => {
  try {
    await updateTestIsCompleted()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run();
