import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RightsGuard } from 'src/core/guards/rights.guard';
import { ResourceIdParam } from 'src/modules/resource/controllers/requests/parameters/resource-id-param.dto';
import { User } from 'src/modules/user/domain/user';
import { ResourceService } from '../services/resource/resource.service';
import { ResourceCreateRequest } from './requests/resource-create-request.dto';
import { ResourceUpdateRequest } from './requests/resource-update-request.dto';
import { ResourceResponseAdapter } from './resource-response.adapter';
import { ResourceResponse } from './responses/resource-response.dto';

@Controller('resources')
export class ResourceController {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly ResourceResponseAdapter: ResourceResponseAdapter,
  ) {}

  @Get()
  @Roles('admin')
  async getResources(): Promise<ResourceResponse[]> {
    const resources = await this.resourceService.getResources();
    return resources.map((resource) =>
      this.ResourceResponseAdapter.adaptResource(resource),
    );
  }

  @Get(':resourceId')
  @UseGuards(RightsGuard)
  async getResource(
    @Param() resourceIdParam: ResourceIdParam,
  ): Promise<ResourceResponse> {
    const resource = await this.resourceService.getResource(
      resourceIdParam.resourceId,
    );
    return this.ResourceResponseAdapter.adaptResource(resource);
  }

  @Delete(':resourceId')
  async deleteResource(
    @Param() resourceIdParam: ResourceIdParam,
  ): Promise<void> {
    await this.resourceService.deleteResource(resourceIdParam.resourceId);
  }

  @Post()
  @Roles('regular')
  async createResource(
    @GetUser() user: User,
    @Body() resourceCreateRequest: ResourceCreateRequest,
  ): Promise<void> {
    await this.resourceService.createResource(user, resourceCreateRequest);
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
