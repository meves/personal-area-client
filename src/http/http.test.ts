import { rest } from 'msw';
import { setupServer } from 'msw/node';

test("", () => {
    
})
// // * define API request to mock
// const server = setupServer(
//     // * capture GET /api/greeting/:id requests
// rest.get("/api/greeting/:id", (req, res, ctx) => {
//         return res(ctx.json({ data: {greeting: "Hello there"} }))
//     })
// )

// beforeAll(() => server.listen());
// beforeEach(() => server.resetHandlers());
// afterAll(() => server.close());

// describe("requests to server", () => {
    
    
//     test("handles server error", async () => {
//         // Arrange
//         server.use(
//             rest.get("/api/greeting/:id", (req, res, ctx) => {
//                 return res(ctx.status(500));
//             })
//         );
//         render(<Greeting/>);
//         // Act
//         await userEvent.click(screen.getByText("Load greeting"));
//         await screen.findByRole("alert");
//         // Assert
//         expect(screen.getByRole("alert")).toHaveTextContent("Oops, failed to fetch");
//         expect(screen.getByRole("button")).toBeDisabled();
//     })
// })