import { writeClientServices } from './writeClientServices';
import * as fs from 'fs';
import { Service } from '../client/interfaces/Service';
import { Language } from '../index';
import { Templates } from './readHandlebarsTemplates';

jest.mock('fs');

const fsWriteFileSync = fs.writeFileSync as jest.MockedFunction<typeof fs.writeFileSync>;

describe('writeClientServices', () => {
    it('should write to filesystem', () => {
        const services = new Map<string, Service>();
        services.set('Item', {
            name: 'Item',
            operations: [],
            imports: [],
        });
        const templates: Templates = {
            index: () => 'dummy',
            model: () => 'dummy',
            service: () => 'dummy',
            settings: () => 'dummy',
        };
        writeClientServices(services, Language.TYPESCRIPT, templates, '/');
        expect(fsWriteFileSync).toBeCalledWith('/Item.ts', 'dummy');
    });
});