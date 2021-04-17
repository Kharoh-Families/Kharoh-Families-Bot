import { Assets } from '../global'

import Event from '../lib/classes/Event/Event'
import Command from '../lib/classes/Command/Command'
import ServerRequest from '../lib/classes/ServerRequest/ServerRequest'
import Utils from '../lib/classes/Utils/Utils'
import Config from './Config/Config'

const assets: Assets = {
  Event, Command, ServerRequest, Utils,

  config: new Config()
}

export default assets
