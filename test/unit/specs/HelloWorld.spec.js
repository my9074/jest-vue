// import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

jest.mock('axios')

describe('Component', () => {
  it('渲染正确的标记', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.contains('button')).toBe(true)
  })

  it('fetches async when a button is clicked', async () => {
    const wrapper = shallowMount(HelloWorld)
    wrapper.find('button').trigger('click')
    await flushPromises()
    expect(wrapper.vm.value).toBe('value2')
  })
})
