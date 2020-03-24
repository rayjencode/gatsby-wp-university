import React, { useState } from "react"
import { graphql } from "gatsby"

const Event = props => {
  const {
    data: {
      wpgraphql: { event },
    },
  } = props

  const { title, featuredImage, eventFields } = event

  // Event Counter
  const [counter, setCounter] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  })

  const { day, hour, minute, second } = counter

  let countDate = new Date(eventFields.startDate).getTime()

  const newEvent = () => {
    var now = new Date().getTime()
    let gap = countDate - now

    var second = 1000
    var minute = second * 60
    var hour = minute * 60
    var day = hour * 24

    var d = Math.floor(gap / day)
    var h = Math.floor((gap % day) / hour)
    var m = Math.floor((gap % hour) / minute)
    var s = Math.floor((gap % minute) / second)

    setCounter({
      day: d,
      hour: h,
      minute: m,
      second: s,
    })
  }

  setInterval(function() {
    newEvent()
  }, 1000)

  return (
    <div>
      <img src={featuredImage.sourceUrl} alt="featured" />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <p>
        Date Start: <strong>{eventFields.startDate}</strong>{" "}
      </p>
      <p>
        Time Start: <strong>{eventFields.startTime}</strong>{" "}
      </p>
      <p>
        Date End: <strong>{eventFields.endDate}</strong>{" "}
      </p>
      <p>
        Time End: <strong>{eventFields.endTime}</strong>{" "}
      </p>
      <p>
        Location: <strong>{eventFields.location}</strong>{" "}
      </p>

      <h3>{day}</h3>
      <h3>{hour}</h3>
      <h3>{minute}</h3>
      <h3>{second}</h3>
    </div>
  )
}

export default Event
export const pageQuery = graphql`
  query GET_EVENT($id: ID!) {
    wpgraphql {
      event(id: $id) {
        title
        content
        uri
        slug
        featuredImage {
          sourceUrl
        }
        categories {
          nodes {
            name
          }
        }
        eventFields {
          endDate
          endTime
          startDate
          startTime
          location
        }
      }
    }
  }
`
