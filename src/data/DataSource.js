// import localData from "./0-24.json" assert { type: 'json' }
import localData from "./0.json" assert { type: 'json' }

let data = { allItems: {} }

const deepUpdate = (oldData, newData) => {
    for (const key in newData) {
        if (newData.hasOwnProperty(key)) {
            //todo array merge
            if (typeof newData[key] === 'object' && !Array.isArray(newData[key])) {
                oldData[key] = deepUpdate(oldData[key] || {}, newData[key]);
            } else {
                oldData[key] = newData[key];
            }
        }
    }
    return oldData;
}

const initMockData = () => {
    localData.items.forEach(version => {
        Object.entries(version).forEach(([k, v]) => {
            if (data.allItems.hasOwnProperty(k)) {
                deepUpdate(data.allItems[k], v)
            } else {
                data.allItems[k] = v
            }
        });
    });
}

const arrangeTasks = () => {
    Object.entries(data.allItems).forEach(([k, v]) => {
        if (!data[v.e]) {
            data[v.e] = []
        }
        v['uuid'] = k
        data[v.e].push(v)
    })
}

//todo replace field
// tt title
// nt note
// tp type 0:task 1:project
// tr trashed 
// ss status 0 3:complete
// st start 0:inbox 1:today 2:after
// tir todayIndexReferenceDate
// sr startDate

const getInbox = () => {
    return Object.entries(data['Task6'])
        .filter(([k, v]) => {
            return v.p.tr == 0 && v.p.tp === 0 && v.p.st === 0 && v.p.ss === 0
        })
        .map(([k, v]) => {
            v['uuid'] = k
            return v;
        })
}

const getToday = () => {

}

const getUpcoming = () => {

}

const getAnytime = () => {

}

const getSomeday = () => {

}

const test = () => {
    initMockData()
    arrangeTasks()
    // console.log(data)
    console.log(getInbox())
    // console.log(getToday())
}

test()