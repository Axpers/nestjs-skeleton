import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { Rights } from 'src/core/decorators/rights.decorator';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RouteParameters } from 'src/core/parameters/route-parameters';
import { ResourceIdParam } from 'src/modules/resource/controllers/requests/parameters/resource-id-param.dto';
import { User } from 'src/modules/user/domain/user';
import { ResourceService } from '../services/resource/resource.service';
import { ResourceCreateRequest } from './requests/resource-create-request.dto';
import { ResourceUpdateRequest } from './requests/resource-update-request.dto';
import { ResourceResponseAdapter } from './responses/resource-response.adapter';
import { ResourceResponse } from './responses/resource-response.dto';

@Controller('resources')
export class ResourceController {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly resourceResponseAdapter: ResourceResponseAdapter,
  ) {}

  @Get()
  @Roles('admin')
  async getResources(): Promise<ResourceResponse[]> {
    const resources = await this.resourceService.getResources();
    return resources.map((resource) =>
      this.resourceResponseAdapter.adaptResource(resource),
    );
  }

  @Get(`user/:${RouteParameters.UserId}`)
  @Rights('userId')
  async getResourcesByUser(@GetUser() user: User): Promise<ResourceResponse[]> {
    const resources = await this.resourceService.getResourcesByUser(user);

    return resources.map((resource) =>
      this.resourceResponseAdapter.adaptResource(resource),
    );
  }

  @Get(`:${RouteParameters.ResourceId}`)
  @Rights('resourceId')
  async getResource(
    @Param() resourceIdParam: ResourceIdParam,
  ): Promise<ResourceResponse> {
    const resource = await this.resourceService.getResource(
      resourceIdParam.resourceId,
    );
    return this.resourceResponseAdapter.adaptResource(resource);
  }

  @Delete(`:${RouteParameters.ResourceId}`)
  @Rights('resourceId')
  async deleteResource(
    @Param() resourceIdParam: ResourceIdParam,
  ): Promise<void> {
    await this.resourceService.deleteResource(resourceIdParam.resourceId);
  }

  @Post()
  async createResource(
    @GetUser() user: User,
    @Body() resourceCreateRequest: ResourceCreateRequest,
  ): Promise<void> {
    await this.resourceService.createResource(user, resourceCreateRequest);
  }

  @Put(`:${RouteParameters.ResourceId}`)
  @Rights('resourceId')
  async updateResource(
    @Param() resourceIdParam: ResourceIdParam,
    @Body() resourceUpdateRequest: ResourceUpdateRequest,
  ): Promise<void> {
    await this.resourceService.updateResource(
      resourceIdParam.resourceId,
      resourceUpdateRequest,
    );
  }
}
