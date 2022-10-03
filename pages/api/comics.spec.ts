import { Comic } from "dh-marvel/features/Types/comic.types"
import comics from "dh-marvel/test/mocks/comics"
import { createMocks } from "node-mocks-http"
import handler from "./comics.route"


xdescribe('MarvelService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe('when fetching comics', () => {
        describe('when fetching without offset and limit', () => {
            it('should return a valid default page of comics', async () => {
                const comics = {data: { results: {} as Comic[]}};
                const {req, res} = createMocks({
                    method: 'GET',
                });
                await handler(req, res);
                console.log("DATA", res._getData())
                expect(res._getStatusCode()).toBe(200)
                expect(JSON.parse(res._getData())).toEqual(
                    expect.objectContaining(comics),
                );
            })
        })
    })
})