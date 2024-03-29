import { Meta, StoryObj } from '@storybook/react'
import { AutoComplete, DataSourceType } from './autoComplete'

const meta: Meta<typeof AutoComplete> = {
    component: AutoComplete,
    tags: ['autodocs'],
    
    parameters: {
        docs: {
            source: {
                type: "code",
            },
        }
    }
}


export default meta;
type Story = StoryObj<typeof meta>
//@ts-ignore
export const ASimpleComplete: Story = (args) => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
        'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
    const handleFetch = (query: string) => {
        return lakers.filter(name => name.includes(query)).map(name => ({ value: name }))
    }
    return (
        <AutoComplete
            {...args}
            fetchSuggestions={handleFetch}
            placeholder="输入"
        />
    )
}
ASimpleComplete.storyName = '1 基本的搜索'

//@ts-ignore
export const BCustomComplete = (args) => {
    const lakersWithNumber = [
        { value: 'bradley', number: 11 },
        { value: 'pope', number: 1 },
        { value: 'caruso', number: 4 },
        { value: 'cook', number: 2 },
        { value: 'cousins', number: 15 },
        { value: 'james', number: 23 },
        { value: 'AD', number: 3 },
        { value: 'green', number: 14 },
        { value: 'howard', number: 39 },
        { value: 'kuzma', number: 0 },
    ]
    const handleFetch = (query: string) => {
        return lakersWithNumber.filter(player => player.value.includes(query))
    }
    const renderOption = (item: DataSourceType) => {
        const itemWithNumber = item 
        return (
            <>
                <b>名字: {itemWithNumber.value}</b>
                <span>球衣号码: {itemWithNumber.number}</span>
            </>
        )
    }
    return (
        <AutoComplete
            {...args}
            fetchSuggestions={handleFetch}
            placeholder="自定义下拉模版"
            renderOption={renderOption}
        />
    )
}
BCustomComplete.storyName = '2 自定义搜索结果模版'

//@ts-ignore
export const CAjaxComplete = (args) => {
    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({ items }) => {
                return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
            })
    }

    const renderOption = (item: DataSourceType) => {
        const itemWithGithub = item
        return (
            <>
                <b>Name: {itemWithGithub.value}</b>
                <span>url: {itemWithGithub.url}</span>
            </>
        )
    }
    return (
        <AutoComplete
            {...args}
            fetchSuggestions={handleFetch}
            placeholder="输入 Github 用户名试试"
            renderOption={renderOption}
        />
    )
}
CAjaxComplete.storyName = '3 支持异步搜索'