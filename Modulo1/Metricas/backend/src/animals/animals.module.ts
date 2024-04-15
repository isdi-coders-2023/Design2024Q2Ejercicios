import { Module } from '@nestjs/common';
import { SlugService } from './slug/slug.service';
import { TurtleService } from './turtle/turtle.service';
import { SlothService } from './sloth/sloth.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [SlugService, TurtleService, SlothService],
  exports: [SlugService, TurtleService, SlothService],
})
export class AnimalsModule {}
