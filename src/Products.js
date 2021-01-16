import { Container, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Popover from '@material-ui/core/Popover';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
    root: {
      display: 'flex',
      padding:'20px 0px 35px',
      borderBottom: '1px solid rgb(211,211,211, 0.4)'
    },
    typography: {
      padding: '10px',
    },
    details: {
      display: 'flex',
      width: '70%',
      flexDirection: 'column',
    },
    categorySelect : {
      backgroundColor: 'white',
      color:'black',
      boxShadow:'none'
    },
    content: {
      flex: '1 0 auto',
      padding:'10px 25px'
    },
    cover: {
      width: '131px',
      maxWidth: '30%'
    },
    buttons : {
      boxShadow:'none',
      backgroundColor:'#32CD32',
      color:'white',
      borderRadius:'3px',
      fontSize:'13px'
    },
    buttonOutofStock : {
      boxShadow:'none',
      backgroundColor:'lightgrey',
      color:'white',
      borderRadius:'3px',
      fontSize:'13px'
    },
    price : {
      color:"black",
      fontWeight:'700'
    },
    insidetile: {
      padding:'15px',
      border: '1px solid lightgray',
    },
    categoryName : {
      fontWeight:'bold',
      overflowX:'hidden',
      textOverflow:'ellipsis',
      whiteSpace:'nowrap'
    },
    weight : {
      color:"lightgrey",
      fontWeight:'500',
      paddingTop:'3px',
      fontSize:'10px'
    },
    categorySlider : {
      width: '100%',
      overflowX: 'scroll',
      marginBottom: '10px',
      backgroundColor: 'transparent',
      whiteSpace: 'unset',
      display: 'flex',
      backfaceVisibility: 'hidden',
    },
    categoryButton : {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '55px',
      width: '110px',
      cursor: 'pointer',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color:"white",
      backgroundColor: 'rgba(0,0,0,0.22)',
      borderRadius: '4px',
      backfaceVisibility: 'hidden',
    },
  };


class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productNo: 3,
      totalProductCount:0,
      productsList : [],
      categoryList: [],
      categoryName: 'Sales',
      value:0,
      heading:'',
      viewButton:true,
      anchorEl: null,
      open:false
    }
  }

  componentDidMount() {
    this.allContentData();
  }

  allContentData() {
    axios.get('https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob').then(res => {
      this.setState({
        heading : res.data.heading,
        productsList : res.data.product_list.products,
        totalProductCount: res.data.product_list.count,
        categoryList: res.data.category_list,
      })
    })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  incProductCount = () => {
      this.setState({
        productNo : this.state.productNo + this.state.totalProductCount,
        viewButton: false
      })
  }

  decProductCount = () => {
    this.setState({
      productNo : this.state.totalProductCount - this.state.productNo,
      viewButton: true
    })
}

showProducts = (category_id,category_name) => { 
  axios.get(`https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${category_id}`, {
    category_id : category_id
  }).then(res => {
    this.setState({
      productsList : res.data.products,
      categoryName:category_name,
      totalProductCount: res.data.count,
    })
  })
}

openDialogService = (event) => {
  this.setState({
    open:true,
    anchorEl: event.currentTarget
  })
}

handleClose = () => {
  this.setState({
    open:false,
    anchorEl : null
  })
}
  render () {
    const {classes} = this.props;
    const {productsList, anchorEl, heading, open,categoryName, categoryList, viewButton, productNo} = this.state;
    
    return (
      <Container>
          <Grid container >
            <Grid item xs={11} style={{padding:'10px'}}>
              <Typography component="h6" variant="h6" className={classes.price}>
                  {heading}
              </Typography>
            </Grid>
            <Grid item lg={12} xs={12} >
              <Grid container direction='row' alignItems='center' justify='center'>
              <Grid item lg={12} xs={12} className={classes.categorySlider}>
              {categoryList && categoryList.map((cat,i) => {
                return (
                  <Grid item lg={2} xs={6} key={i} >
                    <Button style={{margin:'10px', backgroundImage: `url(${cat.category_image})`}} className={classes.categoryButton} variant='contained' onClick={() => this.showProducts(cat.category_id)}>{cat.category_name}</Button>
                  </Grid>
                )
              })}
              </Grid>
              </Grid>
            </Grid>
          {productsList && productsList.slice(0,productNo).map((product,i ) => {
            return (
              <Grid item xs={12} key={i}>
                <Card className={classes.root} elevation={0}>
                    <CardMedia
                        className={classes.cover}
                        image={product.image_urls_webp.x520}
                        title="Live from space album cover"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                        <Typography component="h6" variant="subtitle2" className={classes.price}>
                            {product.name}
                        </Typography>
                        <Typography variant="body2" component="p" className={classes.weight}>
                           ({product.weight}{product.weight_unit})
                        </Typography>
                        <Typography variant="subtitle1" className={classes.price}>
                          &#8377;{product.final_price} <span style={{color:'grey', fontSize:'12px', marginLeft:'10px'}}><strike>&#8377;{product.price}</strike></span>
                        </Typography>
                        </CardContent>
                        <div style={{paddingLeft:'25px'}}>
                          <Button className={product.is_in_stock === true ? classes.buttons : classes.buttonOutofStock} variant='contained'>{product.is_in_stock === true ? 'Add to Cart' : 'Out of Stock'}</Button>
                        </div>
                    </div>
                    
                    </Card>
              </Grid>
            )
          })}
          <Grid item xs={12} style={{padding:'10px 9px'}}>
            <Grid container direction='row' alignItems='center' className={classes.insidetile}>
              <Grid item xs={2}>
                <Typography variant="body2" component="p" className={classes.weight}>
                    Showing for
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" component="p" className={classes.categoryName}>
                  {categoryName}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography align='right' variant="body2" onClick={this.openDialogService} component="p" className={classes.weight}>
                    change
                </Typography>
              </Grid>
              <Grid item xs={5} >
                {viewButton ? 
                <Typography align='right' variant="subtitle2" className={classes.categoryName} onClick={this.incProductCount}>
                    View More
                </Typography>
                :
                <Typography align='right' variant="subtitle2" className={classes.categoryName} onClick={this.decProductCount}>
                    View Less
                </Typography>
                }
              </Grid>
            </Grid>
          </Grid>
            <Popover
              id='simple-popover'
              open={open}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              {categoryList && categoryList.map((cat,i) => {
              return (
                <Grid item key={i}>
                  <Typography onClick={() => this.showProducts(cat.category_id,cat.category_name)} className={classes.typography}>{cat.category_name}</Typography>
                </Grid>
              )
            })}
            </Popover>
        </Grid>
      </Container>
    )
  }
}

export default (withStyles(styles)(Products));
