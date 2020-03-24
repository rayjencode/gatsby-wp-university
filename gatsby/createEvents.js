const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
  // Setup our query
  const GET_EVENTS = `
        query GET_EVENTS($first:Int $after:String ){
            wpgraphql{
                events(
                    first: $first
                    after: $after
                ){
                    pageInfo{
                        endCursor
                        hasNextPage
                    }
                    nodes {
                        title
                        id
                        uri
                        slug
                        eventId
                        featuredImage {
                          id
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
                          location
                          startDate
                          startTime
                        }
                      }
                }
            }
        }
    `

  const { createPage } = actions
  const allEvents = []

  // Create a function for getting events
  const fetchEvents = async variables =>
    await graphql(GET_EVENTS, variables).then(({ data }) => {
      const {
        wpgraphql: {
          events: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      nodes.map(event => {
        allEvents.push(event)
      })
      if (hasNextPage) {
        return fetchEvents({ first: variables.first, after: endCursor })
      }
      return allEvents
    })

  // Map over all the events and call createEvents
  await fetchEvents({ first: 100, after: null }).then(allEvents => {
    const eventTemplate = path.resolve(`./src/templates/event.js`)

    allEvents.map(event => {
      console.log(`create event: ${event.uri}`)
      createPage({
        path: `/${event.uri}`,
        component: eventTemplate,
        context: event,
      })
    })
  })
}
