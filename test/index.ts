import {assert, expect} from 'chai'
import { deepClone } from '../src/index'

describe('深克隆测试', () => {
    it('1: 克隆第一层', () => {
        var jack: any = {
            name: 'jack',
            age: 22,
        }
        const j = deepClone(jack)
        assert(j !== jack)
        expect(j).to.be.eql(jack)
    })
    it('2: 克隆第二层', () => {
        var jack: any = {
            name: 'jack',
            age: 22,
            father: {
                name: 'tony',
                age: 50,
            }
        }
        const j = deepClone(jack)
        assert(j.father !== jack.father)
        expect(j.father).to.be.eql(jack.father)
    })
    it('3: 克隆第三层', () => {
        var jack: any = {
            name: 'jack',
            age: 22,
            father: {
                name: 'tony',
                age: 50,
                father: {
                    name: 'tom',
                    age: 80
                }
            }
        }
        const j = deepClone(jack)
        assert(j.father.father !== jack.father.father)
        expect(j.father.father).to.be.eql(jack.father.father)
    })
    it('4: 克隆嵌套循环', () => {
        var jack: any = {
            name: 'jack',
            age: 22,
        }
        jack.self = jack
        
        const j = deepClone(jack)
        assert(j.self === j)
        j.self = 'j'
        assert(jack.self !== 'j')
    })
    it('5: 克隆普通函数', () => {
        var jack: any = {
            name: 'jack',
            age: 22,
        }
        jack.getName = function(){return this.name}

        const j = deepClone(jack)
        assert(jack.getName !== j.getName)
        assert(j.getName() === 'jack')
    })
    it('6: 克隆箭头函数', () => {
        var jack: any = {
            name: 'jack',
            age: 22,
        }
        jack.getThis = () => this

        const jj = deepClone(jack)
        assert(jack.getThis !== jj.getThis)
        assert(jj.getThis() === this)
    })
    it('7: 克隆数组', () => {
        var jack: any = {
            name: 'jack',
            age: 22,
            arr: [1, [2, 3]],
        }

        const j = deepClone(jack)
        assert(j.arr !== jack.arr)
        expect(j.arr).to.be.eql(jack.arr)
    })
    it('8: 克隆日期', () => {
        var jack: any = {
            name: 'jack',
            age: 22,
            date: new Date(),
        }

        const j = deepClone(jack)
        assert(j.date !== jack.date)
        expect(j.date).to.be.eql(jack.date)
    })
    it('9: 克隆正则表达式', () => {
        var jack: any = {
            name: 'jack',
            age: 22,
            reg: /abc/,
        }

        const j = deepClone(jack)
        assert(j.reg !== jack.reg)
        expect(j.reg).to.be.eql(jack.reg)
    })
    
})