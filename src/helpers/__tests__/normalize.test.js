import { normalize } from '../normalize'

describe('normalize', () => {
  let mockResponse

  describe('normal response', () => {
    beforeEach(() => {
      mockResponse = {
        data: {
          type: 'mock_responses',
          id: 'mock-response-1',
          attributes: {
            mock_field: 'mock value',
            anotherField: 1234
          },
          relationships: {
            parentResponse: {
              data: {
                id: 'mock-response-0',
                type: 'mock_responses'
              }
            },
            childResponses: {
              data: [
                {
                  id: 'mock-response-2',
                  type: 'mock_responses'
                }
              ]
            }
          }
        }
      }
    })

    it('matches snapshot', () => {
      expect(normalize(mockResponse)).toMatchSnapshot()
    })

    it('camelCases attribute names', () => {
      expect(normalize(mockResponse).mockField).toEqual('mock value')
    })

    it('extracts attributes', () => {
      expect(normalize(mockResponse).id).toEqual('mock-response-1')
      expect(normalize(mockResponse).anotherField).toEqual(1234)
    })

    it('extracts relationships', () => {
      expect(normalize(mockResponse)._parentResponse).toEqual(
        'mock-response-0'
      )
      expect(normalize(mockResponse)._childResponses).toContain(
        'mock-response-2'
      )
    })

    describe('empty model', () => {
      beforeEach(() => {
        mockResponse = {
          data: {
            id: 'mock-response-1',
            type: 'mock_responses'
          }
        }
      })

      it('matches snapshot', () => {
        expect(normalize(mockResponse)).toMatchSnapshot()
      })

      it('returns only the id', () => {
        expect(Object.keys(normalize(mockResponse))).toEqual(['id'])
        expect(normalize(mockResponse).id).toEqual('mock-response-1')
      })
    })
  })

  describe('error response', () => {
    let errors = [
      {
        status: '404',
        title: 'Resource not found',
        detail: 'The requested resource was not found'
      }
    ]

    beforeEach(() => {
      mockResponse = {
        errors
      }
    })

    it('throws the returned errors', () => {
      expect(() => normalize(mockResponse)).toThrow('Resource not found')
    })
  })

  describe('invalid document', () => {
    it('rejects an empty document', () => {
      mockResponse = {}
      expect(() => normalize(mockResponse)).toThrow(
        'Invalid JSON API document'
      )
    })

    it('rejects data and errors', () => {
      mockResponse = {
        data: {},
        errors: {}
      }
      expect(() => normalize(mockResponse)).toThrow(
        'Invalid JSON API document'
      )
    })

    it('rejects only meta', () => {
      mockResponse = {
        meta: {}
      }
      expect(() => normalize(mockResponse)).toThrow(
        'Invalid JSON API document'
      )
    })
  })
})
