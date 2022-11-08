const Post = (props) => {
    return (
        <article className="post loading">
            <header>
                <div role="presentation">
                    <div className="author_image">
                        <img src="" alt="author logo" />
                    </div>
                    <div className="author_image_placeholder"></div>
                    <p className="author_and_created">
                        <span className="author"></span>
                        <span className="created"></span>
                    </p>
                </div>
                <h3 className="title"></h3>
            </header>
            <p className="body"></p>
            <footer>
                <p className="ups_comments_and_share">
                    <span className="ups"></span>
                    <a className="comments" href=""></a>
                    <a className="share" href=""></a>
                </p>
            </footer>
        </article>
    );
};

export default Post;