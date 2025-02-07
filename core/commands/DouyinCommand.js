import { BaseCommand } from './BaseCommand.js';
import { douyinParse } from '../../api/douyinParse.js';
import { log, error } from '../../utils/logger.js';

export class DouyinCommand extends BaseCommand {
    constructor(napcat) {
        super('/抖音解析', '解析抖音视频');
        this.setNapcat(napcat);
    }

    async execute(args, context) {
        console.log("执行");
        try {
            // 从消息中提取抖音链接
            let url = args.join(' ') || context.raw_message;
            // 从文字中提取链接
            url = url.match(/https?:\/\/v\.douyin\.com\/\w+/i);
            if (!url) {
                throw new Error('请提供抖音视频链接');
            }
            url = url[0];

            // 解析视频
            log('DOUYIN', '开始解析', { url });

            let result = await douyinParse(url);
            if (!result || result.code != 0) {
                throw new Error('未找到视频链接');
            }
            result = result.data;
            // 发送解析状态
            await this.sendReply(context, `解析成功，正在上传：${result.item.title}`);
            // 暂不支持上传视频
    
            // 上传视频
            try {
                await this.sendReply(context, null, {
                    video: result.item.ury,
                    cover: result.item.cover,
                    noReply: true
                });
            } catch (uploadErr) {
                error('DOUYIN', '视频上传失败', { 
                    error: uploadErr.message,
                    url: result.item.url 
                });
                throw new Error('视频上传失败，请稍后重试');
            }
        } catch (err) {
            throw new Error(`抖音解析失败：${err.message}`);
        }
    }
} 