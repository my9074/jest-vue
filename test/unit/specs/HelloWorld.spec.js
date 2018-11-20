// import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'
import { shallowMount } from '@vue/test-utils'
import { fetchTest, fetchTest2 } from '@/api/action';
import flushPromises from 'flush-promises'

jest.mock('@/api/action', () => ({
  fetchTest: jest.fn().mockResolvedValue({
    data: 'value'
  }),
  fetchTest2: jest.fn().mockResolvedValue({
    data: 'value2'
  })
}));

fetchTest.mockResolvedValue({
  data: 'value2'
});

fetchTest2.mockResolvedValue({
  data: 'value'
});

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
