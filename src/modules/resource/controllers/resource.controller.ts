import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResourceIdParam } from 'src/modules/resource/controllers/requests/parameters/resource-id-param.dto';
import { ResourceService } from '../services/resource/resource.service';
import { ResourceCreateRequest } from './requests/resource-create-request.dto';
import { ResourceUpdateRequest } from './requests/resource-update-request.dto';
import { ResourceControllerResponseAdapter } from './resource-controller-response.adapter';
import { ResourceResponse } from './responses/resource-response.dto';

@Controller('resource')
export class ResourceController {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly resourceControllerResponseAdapter: ResourceControllerResponseAdapter,
  ) {}

  @Get()
  async getResources(): Promise<ResourceResponse[]> {
    const resources = await this.resourceService.getResources();
    return resources.map((resource) =>
      this.resourceControllerResponseAdapter.adaptResource(resource),
    );
  }

  @Get(':resourceId')
  async getResource(
    @Param() resourceIdParam: ResourceIdParam,
  ): Promise<ResourceResponse> {
    const resource = await this.resourceService.getResource(
      resourceIdParam.resourceId,
    );
    return this.resourceControllerResponseAdapter.adaptResource(resource);
  }

  @Delete(':resourceId')
  async deleteResource(
    @Param() resourceIdParam: ResourceIdParam,
  ): Promise<void> {
    await this.resourceService.deleteResource(resourceIdParam.resourceId);
  }

  @Post()
  async createResource(
    @Body() resourceCreateRequest: ResourceCreateRequest,
  ): Promise<void> {
    await this.resourceService.createResource(resourceCreateRequest);
  }

  @Put(':resourceId')
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
