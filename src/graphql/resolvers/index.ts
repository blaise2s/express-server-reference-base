import merge from 'lodash.merge';
import analyzeResolvers from './analyze.resolvers';
import healthCheckResolvers from './health-check.resolvers';

export default merge(healthCheckResolvers, analyzeResolvers);
