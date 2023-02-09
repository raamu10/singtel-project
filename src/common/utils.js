
import * as _ from 'lodash';

export function sortDataByOrder(data, prop, orderType) {
    const sortData = _.orderBy(data, [prop], [orderType])

    return sortData
}