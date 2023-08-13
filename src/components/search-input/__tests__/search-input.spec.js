import { mount } from  '@vue/test-utils';
import SearchInput from '../index.vue';

describe('search-input - Unit', ()=>{
  it('deve ser um componente Vue', ()=>{
    const wrapper = mount(SearchInput, {
      props: {
        value: ''
      }
    });

     expect(wrapper.vm).toBeDefined();
  });
  it('deve atualizar searchQuery quando a propriedade value for alterada', async()=>{
    const wrapper = mount(SearchInput, {
      propsData: {
        value: ''
      }
    });
    //usando o setProps para setar um valor em value
    await wrapper.setProps({value: 'test'});
    //usando o nextTick para forçar o componente a rodar um ciclo de vida
    await wrapper.vm.$nextTick();
    //verificando se search query é igual ao valor que passamos
    expect(wrapper.vm.searchQuery).toEqual('test')

  });
  it('deve iniciar um evento de input quando algo é digitado', async()=>{
    const wrapper = mount(SearchInput, {
      propsData: {
        value: ''
      }
    });
    //usando o find para buscar um elemento html assim como querySelector faz
    const inputElemento = wrapper.find('input[type="text"]');
    //setando um valor no elemento de input
    await inputElemento.setValue('test');
    //usando o emmited para verificar os eventos
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual(['test'])
  });

  test('deve limpar o valor de input quando o icone X é clicado', async()=>{
    const wrapper = mount(SearchInput, {
      propsData: {
        value: ''
      }
    });

    const botaoLimpar = wrapper.find('.input__clear');

    //usando trigger para disparar um evento html
    await botaoLimpar.trigger('click');

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual(['']);
  })
});