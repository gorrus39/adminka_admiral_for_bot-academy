import { Page, Card } from '@devfamily/admiral'
import React from 'react'
import './statistics.scss'
import _ from '@/src/config/request'

const apiUrl = import.meta.env.VITE_API_URL
const hardCode = Boolean(import.meta.env.HARD_CODE)

interface Data {
    tgAccountsTotal: number
    tgAccountsActive: number
    tgAccountsNew: { perDay: number; perWeek: number; perMonth: number }
    purchaseAmount: { perDay: number; perWeek: number; perMonth: number }
    utms: { name: string; perDay: number; perWeek: number; perMonth: number }[]
}

const dataHardCode = {
    tgAccountsTotal: 1000,
    tgAccountsActive: 500,
    tgAccountsNew: { perDay: 50, perWeek: 100, perMonth: 400 },
    purchaseAmount: { perDay: 500, perWeek: 1000, perMonth: 4000 },
    utms: [
        { name: 'qqqfasfdafsd asdffasdfasd', perDay: 10, perWeek: 100, perMonth: 400 },
        { name: 'vbcxvcxxvc agfdgdf', perDay: 10, perWeek: 100, perMonth: 400 },
        { name: 'qqqfasfdafsd asdffewioj', perDay: 10, perWeek: 100, perMonth: 400 },
        { name: 'xcvzxc asdffasdfasd', perDay: 10, perWeek: 100, perMonth: 400 },
    ],
}
hardCode
const Statistics: React.FC = () => {
    const [data, setData] = React.useState<Data | null>(null)

    React.useEffect(() => {
        const fetchData = async () => {
            const url = `${apiUrl}/statistics`
            // debugger
            if (hardCode) {
                setData(dataHardCode)
            } else {
                const responseData: Data = await _.get(url)()
                setData(responseData)
            }
        }
        fetchData()
    }, [])
    return (
        <Page title="Статистика">
            {data && (
                <div className="statistics">
                    <div className="first-block">
                        <div className="first-block_item">
                            <p>
                                Пользователей всего <b>{data.tgAccountsTotal}</b>
                            </p>
                            <p>
                                Активных пользователей всего <b>{data.tgAccountsActive}</b>
                            </p>
                        </div>
                        <ul className="first-block_item">
                            Новых пользователей
                            <li>
                                * за 1 день <b>{data.tgAccountsNew.perDay}</b>
                            </li>
                            <li>
                                * за 7 день <b>{data.tgAccountsNew.perWeek}</b>
                            </li>
                            <li>
                                * за 30 день <b>{data.tgAccountsNew.perMonth}</b>
                            </li>
                        </ul>
                        <ul className="first-block_item">
                            Сумма покупок
                            <li>
                                * за 1 день <b>{data.purchaseAmount.perDay}</b>
                            </li>
                            <li>
                                * за 7 день <b>{data.purchaseAmount.perWeek}</b>
                            </li>
                            <li>
                                * за 30 день <b>{data.purchaseAmount.perMonth}</b>
                            </li>
                        </ul>
                    </div>

                    <div className="second-block">
                        {data.utms.map((utm, key) => (
                            <ul className="second-block_item" key={key}>
                                Перешли по UTM - <b>{utm.name}</b>
                                <li>
                                    * за 1 день <b>{utm.perDay}</b>
                                </li>
                                <li>
                                    * за 7 день <b>{utm.perWeek}</b>
                                </li>
                                <li>
                                    * за 30 день <b>{utm.perMonth}</b>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            )}
        </Page>
    )
}

export default Statistics
