import { Controller, Get, Query } from '@nestjs/common';
import { SlugService } from './animals/slug/slug.service';
import { TurtleService } from './animals/turtle/turtle.service';
import { SlothService } from './animals/sloth/sloth.service';

@Controller()
export class AppController {
  constructor(
    private readonly slug: SlugService,
    private readonly turtle: TurtleService,
    private readonly sloth: SlothService,
  ) {}

  @Get('/slug')
  getCreepingSlug(@Query('debug') debug: boolean): string {
    return this.slug.creep(debug);
  }

  @Get('/turtle')
  getCrawlingTurtle(@Query('debug') debug: boolean): string {
    return this.turtle.crawl(debug);
  }

  @Get('/sloth')
  getSleepySloth(@Query('debug') debug: boolean): string {
    return this.sloth.sleep(debug);
  }
}
