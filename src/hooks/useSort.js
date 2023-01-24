import {useMemo} from "react";


export const useSortedData = (data, count, type) => {
    const sortedData = useMemo(() => {
        let sortedCount = data.items.filter(room => room.count_people >= count)
        if (type !== '') {
            return sortedCount.filter(room => data.types.filter(i => i.id === room.typeId)[0].name.toUpperCase() === type)
        }
        return sortedCount
    }, [data.items, count, type])

    return sortedData
}