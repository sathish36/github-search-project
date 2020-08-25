import supertest from 'supertest';
import { app } from '../../../src/server'

describe('Search Controller', () => {

    describe('Search API', () => {
        it('Should return 401 if type is missing', async () => {
            await supertest(app)
                .post("/api/search")
                .set('Content-Type', 'application/json')
                .send('{}')
                .expect(400)
                .expect({ message: 'Search type is required' })
        })
        it('Should return 401 if searchText is missing', async () => {
            await supertest(app)
                .post("/api/search")
                .set('Content-Type', 'application/json')
                .send('{"type":"users"}')
                .expect(400)
                .expect({ message: 'Search text should be minimum 3 characters' })
        })

        it('Should return 400 if invalid search type is provided', async () => {
            await supertest(app)
                .post("/api/search")
                .set('Content-Type', 'application/json')
                .send('{"type":"xyz","searchText":"abc"}')
                .expect(400)
                .expect({ message: 'Invalid search type provided' })
        })

        it('Should return 200 with users data', async () => {
            await supertest(app)
                .post("/api/search")
                .set('Content-Type', 'application/json')
                .send('{"type":"users", "searchText":"abcd"}')
                .expect(200)
                .then((response) => {
                    // Check the response type and length
                    expect(response.body).toBeDefined()
                    expect(response.body.users).toBeDefined();
                    expect(response.body.repositories).toBeUndefined();
                    expect(response.body.issues).toBeUndefined();
                  })
        })

        it('Should return 200 with repositories data', async () => {
            await supertest(app)
                .post("/api/search")
                .set('Content-Type', 'application/json')
                .send('{"type":"repositories", "searchText":"abcd"}')
                .expect(200)
                .then((response) => {
                    // Check the response type and length
                    expect(response.body).toBeDefined()
                    expect(response.body.repositories).toBeDefined();
                    expect(response.body.users).toBeUndefined();
                    expect(response.body.issues).toBeUndefined();
                  })
        })

        it('Should return 200 with issues data', async () => {
            await supertest(app)
                .post("/api/search")
                .set('Content-Type', 'application/json')
                .send('{"type":"issues", "searchText":"abcd"}')
                .expect(200)
                .then((response) => {
                    // Check the response type and length
                    expect(response.body).toBeDefined()
                    expect(response.body.issues).toBeDefined();
                    expect(response.body.users).toBeUndefined();
                    expect(response.body.repositories).toBeUndefined();
                  })
        })
    })

    describe('clear-cache API', () => {
        it('Should clear the cache from redis', async()=>{
            await supertest(app)
            .post('/api/clear-cache')
            .expect(200)
            .expect({message:'success'})
        })
    })
    
})
