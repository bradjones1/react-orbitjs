import produce from 'immer'

export interface IRecord {
  id?: string
  type: string
  attributes: {
    [key: string]: any
  }
  relationships?: {
    [key: string]: any
  }
}

export type Listener = (record: IRecord) => void

export class Record {
  record: IRecord
  listener: Listener
  
  constructor (record: IRecord, listener: Listener) {
    this.listener = listener
    this.record = record
  }

  get id () {
    return this.record.id
  }

  get type () {
    return this.record.type
  }

  get attributes () {
    return this.record.attributes
  }

  get relationships () {
    return this.record.relationships
  }

  setAttribute = (attribute: string, value: any): this => {
    this.record = produce(this.record, draft => {
      draft.attributes[attribute] = value
    })

    this.listener(this.record)
    return this
  }

  addRelationship = (relationship: string, record: object): this => {
    this.record = produce<IRecord, void, IRecord>(this.record, draft => {
      if (draft.relationships) {
        draft.relationships[relationship] = { data: record }
      } else {
        draft.relationships = { 
          [relationship]: {
            data: record 
          }
        }
      }
    })

    this.listener(this.record)
    return this
  }
}
