import { Redis } from "ioredis";
import { RedisHelper } from "../../../src/common/helpers/redis";
import { CreateCustomerService } from "../../../src/modules/customers/services/create-customer.service";

const makeCustomerDomain = () => ({
  name: "any_name",
  document: 12345678910
});

describe("CreateCustomerService", () => {
  let redisClient: Redis;

  beforeAll(async () => {
    redisClient = await RedisHelper.getClient(false);
  });

  afterAll(async () => {
    redisClient && (await redisClient.quit());
  });

  describe("create", () => {
    it("should create customer", async () => {
      const sut = new CreateCustomerService();

      const customerDataToCreate = makeCustomerDomain();
      const customerCreatedHttpResponse = await sut.create(customerDataToCreate);
      
      const customerCreated = customerCreatedHttpResponse.body
      expect(customerCreated.id).not.toBeNull();
      expect(customerCreated.name).toEqual(customerDataToCreate.name);
      expect(customerCreated.document).toEqual(customerDataToCreate.document);
    });
  });
});
