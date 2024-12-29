import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka = new Kafka({
    clientId: 'nestjs-app',
    brokers: ['localhost:9092'],
  });
  private producer = this.kafka.producer();

  async sendMessage(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [
        {
          value: message,
        },
      ],
    });
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
