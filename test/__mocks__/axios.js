const mockAxios = jest.genMockFromModule('axios')

mockAxios.create = jest.fn(() => mockAxios)
mockAxios.get = () => Promise.resolve({ data: 'value' })
mockAxios.post = () => Promise.resolve({ data: 'value2' })

export default mockAxios
